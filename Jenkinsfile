pipeline {
  agent any

  tools {
    nodejs 'NodeJS_20'
  }

  parameters {
    choice(
      name: 'tags',
      choices: [
        '@master',
        '@sanity',
        '@regression',
        '@end-to-end',
        '@api',
        '@web',
        '@datadriven'
      ],
      description: 'Select the Playwright tag to run'
    )
    choice(
      name: 'browser',
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
        bat 'node --version'
        bat 'npm --version'
        bat 'npm ci'
      }
    }

    stage('Install selected browser') {
      steps {
        bat "npx playwright install ${params.browser}"
      }
    }

    stage('Run Playwright tests') {
      steps {
        script {
          switch (params.tags) {
            case '@web':
              env.ALLURE_RESULTS_DIR = 'allure-results/ui'
              break
            case '@api':
              env.ALLURE_RESULTS_DIR = 'allure-results/api'
              break
            case '@end-to-end':
            case '@datadriven':
              env.ALLURE_RESULTS_DIR = 'allure-results/ui'
              break
            case '@master':
            case '@sanity':
            case '@regression':
              env.ALLURE_RESULTS_DIR = 'allure-results'
              break
            default:
              error "Unsupported tag: ${params.tags}"
          }

          env.BROWSER = params.browser
          bat "npx playwright test --grep \"${params.tags}\" --project=${params.browser}"
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
