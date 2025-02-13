pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-north-1'
        BACKEND_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/my-backend'
        FRONTEND_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/my-frontend'
        MYSQL_REPO = '253490768277.dkr.ecr.eu-north-1.amazonaws.com/mysql'
        EC2_PUBLIC_IP = '13.61.27.148'
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    git url: 'https://github.com/Ishitatrivedi23/node-app-project.git', branch: 'master'
                }
            }
        }

        stage('Authenticate with AWS ECR') {
            steps {
                script {
                    sh """
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $BACKEND_REPO
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $FRONTEND_REPO
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $MYSQL_REPO
                    """
                }
            }
        }

        stage('Build and Push Backend Image') {
            steps {
                script {
                    sh """
                    docker build -t backend-image ./backend
                    docker tag backend-image:latest $BACKEND_REPO:latest
                    docker push $BACKEND_REPO:latest
                    """
                }
            }
        }

        stage('Build and Push Frontend Image') {
            steps {
                script {
                    sh """
                    docker build -t frontend-image ./frontEnd
                    docker tag frontend-image:latest $FRONTEND_REPO:latest
                    docker push $FRONTEND_REPO:latest
                    """
                }
            }
        }

        stage('Build and Push MySQL Image') {
            steps {
                script {
                    sh """
                    docker build -t mysql-image ./mysql
                    docker tag mysql-image:latest $MYSQL_REPO:latest
                    docker push $MYSQL_REPO:latest
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sshagent(['ec2-key']) {  // Jenkins SSH credential ID
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
                        docker run -d --name my-frontend --network my-app-network -p 80:3000 $FRONTEND_REPO:latest
                        EOF
                        """
                    }
                }
            }
        }
    }
}
