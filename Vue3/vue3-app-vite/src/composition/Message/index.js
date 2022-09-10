import { createApp, createVNode, render } from 'vue'
import MyMessageConstructor from './index.vue'
console.log(MyMessage)

function createMyMessage(options) {
  const app = createApp(MyMessageConstructor, options)
  const container = document.createElement('div')
  container.className = `container_123`
  document.body.appendChild(container)
  app.mount('.container_123')
}

const MyMessage = options => {
  return createMyMessage(options);
}

export default MyMessage;