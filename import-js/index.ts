function importJs() {
  import('https://dev.g.alicdn.com/alime-components/fliggy-common-info-card/0.0.1/index.js')
  .then(res => {
    console.log('success', res)
  })
  .catch(error => {
    console.log('error', error)
  });
}
