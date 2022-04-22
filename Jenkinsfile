pipeline{
    agent any

    environment {
        ECR_REPO = '838127195462.dkr.ecr.us-east-1.amazonaws.com/app01-nodejs'
    }
    parameters{
        string(
            name: "BRANCH",
            defaultValue: "main"
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
/*        stage("Checkout") {
            steps{
                git branch:env.BRANCH, url:env.CODE_REPO
            }
        }*/
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
                    sh "docker build -t ${env.ECR_REPO} ."
                }
            }
        }
        stage("Push Docker image") {
            steps{
                script {
                    sh "docker push ${env.ECR_REPO}"
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