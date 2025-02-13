pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_REGION = 'eu-north-1'
        ECR_REGION = 'eu-north-1'
        
        BACKEND_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/my-backend'
        FRONTEND_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/my-frontend'
        MYSQL_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/mysql'
        
        EC2_PUBLIC_IP = '16.16.98.131'  // Replace with your actual EC2 instance public IP
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Ishitatrivedi23/node-app-project.git', branch: 'master'
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh 'docker build -t frontend-image ./frontEnd'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    sh 'docker build -t backend-image ./backend'
                }
            }
        }

        stage('Build MySQL Image') {
            steps {
                script {
                    sh 'docker build -t mysql-image ./mysql'
                }
            }
        }
    }
}
