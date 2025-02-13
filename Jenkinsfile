@@ -2,58 +2,66 @@ pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        ECR_REGION = 'eu-north-1'
        AWS_REGION = 'eu-north-1'
        BACKEND_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/my-backend'
        FRONTEND_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/my-frontend'
        MYSQL_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/mysql'
        EC2_PUBLIC_IP = '13.61.27.148'
        EC2_PUBLIC_IP = '16.16.98.131'  // Replace with your actual EC2 instance public IP
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/Ishitatrivedi23/node-app-project.git'
                script {
                    git url: 'https://github.com/Ishitatrivedi23/node-app-project.git', branch: 'master'
                }
            }
        }

        stage('Authenticate with AWS ECR') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region $ECR_REGION | docker login --username AWS --password-stdin $BACKEND_REPO'
                    sh 'aws ecr get-login-password --region $ECR_REGION | docker login --username AWS --password-stdin $FRONTEND_REPO'
                    sh 'aws ecr get-login-password --region $ECR_REGION | docker login --username AWS --password-stdin $MYSQL_REPO'
                    sh """
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $BACKEND_REPO
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $FRONTEND_REPO
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $MYSQL_REPO
                    """
                }
            }
        }

        stage('Build and Push Backend') {
        stage('Build and Push Frontend Image') {
            steps {
                script {
                    sh 'docker build -t my-backend ./backend'
                    sh 'docker tag my-backend:latest $BACKEND_REPO:latest'
                    sh 'docker push $BACKEND_REPO:latest'
                    sh """
                    docker build -t frontend-image ./frontEnd
                    docker tag frontend-image:latest $FRONTEND_REPO:latest
                    docker push $FRONTEND_REPO:latest
                    """
                }
            }
        }

        stage('Build and Push Frontend') {
        stage('Build and Push Backend Image') {
            steps {
                script {
                    sh 'docker build -t my-frontend ./frontEnd'
                    sh 'docker tag my-frontend:latest $FRONTEND_REPO:latest'
                    sh 'docker push $FRONTEND_REPO:latest'
                    sh """
                    docker build -t backend-image ./backend
                    docker tag backend-image:latest $BACKEND_REPO:latest
                    docker push $BACKEND_REPO:latest
                    """
                }
            }
        }

        stage('Build and Push MySQL') {
        stage('Build and Push MySQL Image') {
            steps {
                script {
                    sh 'docker build -t mysql ./mysql'
                    sh 'docker tag mysql:latest $MYSQL_REPO:latest'
                    sh 'docker push $MYSQL_REPO:latest'
                    sh """
                    docker build -t mysql-image ./mysql
                    docker tag mysql-image:latest $MYSQL_REPO:latest
                    docker push $MYSQL_REPO:latest
                    """
                }
            }
        }

@@ -61,22 +69,34 @@ pipeline {
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
                    sshagent(['ec2-key']) {  // Use Jenkins SSH credentials
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@$EC2_PUBLIC_IP << EOF
                        echo "Stopping existing containers..."
                        docker stop my-backend my-frontend mysql || true
                        docker rm my-backend my-frontend mysql || true

                        echo "Pulling new images from ECR..."
                        docker pull $BACKEND_REPO:latest
                        docker pull $FRONTEND_REPO:latest
                        docker pull $MYSQL_REPO:latest

                        echo "Creating Docker network..."
                        docker network create my-app-network || true

                        echo "Starting MySQL container on port 3306..."
                        docker run -d --name mysql --network my-app-network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=mydb -p 3306:3306 $MYSQL_REPO:latest

                        echo "Starting Backend container on port 8000..."
                        docker run -d --name my-backend --network my-app-network -p 8000:8000 $BACKEND_REPO:latest

                        echo "Starting Frontend container on port 5000..."
                        docker run -d --name my-frontend --network my-app-network -p 5000:5000 $FRONTEND_REPO:latest
                        EOF
                        """
                    }
                }
            }
        }
    }
}
