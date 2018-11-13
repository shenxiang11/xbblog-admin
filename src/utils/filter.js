import Vue from 'vue'

Vue.filter('category', value => {
  const dict = {
    'code': '代码',
    'think': '思考',
    'fitness': '健身'
  }

  return dict[value]
})
