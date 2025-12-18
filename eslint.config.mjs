// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'indent': ['error', 2], // вкладеність 2 пробіли
    'object-curly-spacing': ['error', 'always'], // відступи в import
    'no-trailing-spaces': 'error', // помилка якщо пробіл в кінці рядка
    'semi': ['error', 'never'], // без крапок з комою
    'comma-dangle': ['error', 'never'], // без коми після останньої властивості
    'arrow-spacing': ['error', { 'before': true, 'after': true }] // пробіли навколо =>
  }
})
