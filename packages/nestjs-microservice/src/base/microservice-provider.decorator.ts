import { applyDecorators, Injectable } from '@nestjs/common'

export function MSP(messageQueue: string) {
  return applyDecorators(Injectable(), SetMessageQueue(messageQueue))
}

function SetMessageQueue(messageQueue: string) {
  return <T extends new (...args: any[]) => any>(constructorFn: T): any => {
    Reflect.set(constructorFn, 'queue', messageQueue)

    return constructorFn
  }
}
