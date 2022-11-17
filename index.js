async function asyncPromise(par1) {
  if (par1 < 0 || par1 > 50000) {
    return new Error('Par1 is invalid')
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (par1 + 1000 >= 25000) {
        reject(new Error('Server Timeout'))
      } else {
        resolve(par1 * 2)
      }
    }, 1000 + par1)
  })
}

async function asyncParallel1(par1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (par1 / 2 >= 2000) {
        reject(new Error('Parallel #1 Timed out'))
      } else {
        resolve(true)
      }
    }, par1 / 2)
  })
}

function asyncParallel2(par1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (par1 / 3 >= 2000) {
        reject(new Error('Parallel #2 Timed out'))
      } else {
        resolve(true)
      }
    }, par1 / 3)
  })
}

function asyncParallel3(par1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (par1 / 4 >= 2000) {
        reject(new Error('Parallel #3 Timed out'))
      } else {
        resolve(true)
      }
    }, par1 / 4)
  })
}

async function runAsyncParallels(par1) {
  const parallel1 = asyncParallel1(par1)
  const parallel2 = asyncParallel2(par1)
  const parallel3 = asyncParallel3(par1)

  const settledPromises = await Promise.allSettled([parallel1, parallel2, parallel3])
  const resolvedPromises = settledPromises.filter((value) => value.status === 'fulfilled').map((val) => val.value)
  const rejectedPromises = settledPromises.filter((value) => value.status === 'rejected').map((val) => val.reason.toString())

  return [...rejectedPromises, ...resolvedPromises]
}

function asyncCB(par1, cb) {
  asyncPromise(par1)
    .then((handleResolve) => {
      cb(null, handleResolve)

      runAsyncParallels(handleResolve)
        .then((results) => results.forEach((promline) => console.log(promline)))

      asyncCB(handleResolve, cb)
    })
    .catch((err) => cb(err))
}

function myCallback(err, result) {
  if (err) {
    console.log(`ERR: ${err.message}`)
  } else {
    console.log(`SUCCESS: ${result}`)
  }
}

asyncCB(30, myCallback)
