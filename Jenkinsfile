pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        ECR_REGION = 'eu-north-1'
        BACKEND_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/my-backend'
        FRONTEND_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/my-frontend'
        MYSQL_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/mysql'
        EC2_PUBLIC_IP = '13.61.27.148'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Ishitatrivedi23/node-app-project.git'
            }
        }

        stage('Authenticate with AWS ECR') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region $ECR_REGION | docker login --username AWS --password-stdin $BACKEND_REPO'
                    sh 'aws ecr get-login-password --region $ECR_REGION | docker login --username AWS --password-stdin $FRONTEND_REPO'
                    sh 'aws ecr get-login-password --region $ECR_REGION | docker login --username AWS --password-stdin $MYSQL_REPO'
                }
            }
        }

        stage('Build and Push Backend') {
            steps {
                script {
                    sh 'docker build -t my-backend ./Backend'
                    sh 'docker tag my-backend:latest $BACKEND_REPO:latest'
                    sh 'docker push $BACKEND_REPO:latest'
                }
            }
        }

        stage('Build and Push Frontend') {
            steps {
                script {
                    sh 'docker build -t my-frontend ./Frontend'
                    sh 'docker tag my-frontend:latest $FRONTEND_REPO:latest'
                    sh 'docker push $FRONTEND_REPO:latest'
                }
            }
        }

        stage('Build and Push MySQL') {
            steps {
                script {
                    sh 'docker build -t mysql ./MySQL'
                    sh 'docker tag mysql:latest $MYSQL_REPO:latest'
                    sh 'docker push $MYSQL_REPO:latest'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@$EC2_PUBLIC_IP << EOF
                    docker stop my-backend my-frontend mysql || true
                    docker rm my-backend my-frontend mysql || true
                    docker pull $BACKEND_REPO:latest
                    docker pull $FRONTEND_REPO:latest
                    docker pull $MYSQL_REPO:latest
                    docker network create my-app-network || true
                    docker run -d --name mysql --network my-app-network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=mydb $MYSQL_REPO:latest
                    docker run -d --name my-backend --network my-app-network -p 5000:5000 $BACKEND_REPO:latest
                    docker run -d --name my-frontend --network my-app-network -p 80:80 $FRONTEND_REPO:latest
                    EOF
                    """
                }
            }
        }
    }
}

