export const DOCKER_SERVICE_NAME = 'rabbitmq'
export const DOCKER_SERVICE = {
  image: 'rabbitmq:4-management-alpine',
  ports: ['5672:5672', '15672:15672']
}
