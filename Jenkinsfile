pipeline{
    agent any

    environment {
        CODE_REPO = 'https://github.com/josefloressv/devops-cicd-container-nodejs.git'
        ECR_REPO_NAME = 'app01-nodejs'
    }
    parameters{
        string(
            name: "BRANCH",
            defaultValue: "master"
        )
    }

    options{
        disableConcurrentBuilds()
        timestamps()
        buildDiscarder(logRotator(daysToKeepStr: '30'))
    }

    stages{
        stage("Prepare") {
            steps{
                cleanWs()
                script {
                    if (env.BRANCH == null || env.BRANCH == "") {
                        error "BRANCH is required"
                    }
                    currentBuild.displayName = "#${BUILD_NUMBER} ${env.BRANCH}"
                }
            }
        }
        stage("Checkout") {
            steps{
                git branch:env.BRANCH, url:env.CODE_REPO
            }
        }
        stage("Build") {
            steps{
                script {
                    sh "npm install"
                }
            }
        }        
        stage("Build Docker image") {
            steps{
                script {
                    sh "docker build -t ${GLOBAL_AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/${env.ECR_REPO_NAME}:latest ."
                }
            }
        }
        stage("Docker Login") {
            steps{
                script {
                    sh 'docker login --username AWS --password \$(aws ecr get-login-password --region us-east-1) ${GLOBAL_AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com'
                }
            }
        }
        stage("Push Docker image") {
            steps{
                script {
                    sh "docker push ${GLOBAL_AWS_ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/${env.ECR_REPO_NAME}:latest"
                }
            }
        }
        /*stage("Deployment") {
            steps{
                script {
                    
                }
            }
        }*/
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}