pipeline {
  agent any

  parameters {
    choice(
      name: 'TEST_SUITE',
      choices: ['all', 'web', 'api', 'sanity', 'regression', 'e2e', 'datadriven'],
      description: 'Select which Playwright suite to run'
    )
    choice(
      name: 'BROWSER',
      choices: ['chromium', 'firefox', 'webkit'],
      description: 'Select which browser to run the tests in'
    )
  }

  environment {
    CI = 'true'
    WEB_APP_URL = 'https://tutorialsninja.com/demo/'
    API_BASE_URL = 'https://fakestoreapi.com'
    APP_ENV = 'jenkins'
  }

  stages {
    stage('Checkout') {
      steps {
        deleteDir()
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Install selected browser') {
      steps {
        bat "npx playwright install ${params.BROWSER}"
      }
    }

    stage('Run Playwright tests') {
      steps {
        script {
          def suiteFilter
          switch (params.TEST_SUITE) {
            case 'all':
              suiteFilter = '@master'
              env.ALLURE_RESULTS_DIR = 'allure-results'
              break
            case 'web':
              suiteFilter = '@web'
              env.ALLURE_RESULTS_DIR = 'allure-results/ui'
              break
            case 'api':
              suiteFilter = '@api'
              env.ALLURE_RESULTS_DIR = 'allure-results/api'
              break
            case 'sanity':
              suiteFilter = '@sanity'
              env.ALLURE_RESULTS_DIR = 'allure-results'
              break
            case 'regression':
              suiteFilter = '@regression'
              env.ALLURE_RESULTS_DIR = 'allure-results'
              break
            case 'e2e':
              suiteFilter = '@end-to-end'
              env.ALLURE_RESULTS_DIR = 'allure-results/ui'
              break
            case 'datadriven':
              suiteFilter = '@datadriven'
              env.ALLURE_RESULTS_DIR = 'allure-results/ui'
              break
            default:
              error "Unsupported test suite: ${params.TEST_SUITE}"
          }

          bat "npx playwright test --grep \"${suiteFilter}\" --project=${params.BROWSER}"
        }
      }
    }

    stage('Archive reports and results') {
      steps {
        archiveArtifacts(
          artifacts: 'playwright-report/**,allure-results/**,test-results/**',
          allowEmptyArchive: true
        )
      }
    }
  }

  post {
    failure {
      archiveArtifacts(
        artifacts: 'playwright-report/**,allure-results/**,test-results/**',
        allowEmptyArchive: true
      )
    }
    aborted {
      archiveArtifacts(
        artifacts: 'playwright-report/**,allure-results/**,test-results/**',
        allowEmptyArchive: true
      )
    }
  }
}
