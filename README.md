# async-exercise-2
Create a new project in your own github page, name it async-exercise-2

Spec:
We need to create an asynchronous function that accepts a numeric parameter from 0-50000. If the parameter is invalid, throw an Error indicating "Par1 is invalid". The function will resolve after waiting for 1 second plus the value of par 1 (using setInterval). This means if par1 value is 500, then the resolve (or reject) will occur after 1500 ms. 

// something like this
async function asyncPromise(par1) {
  	setInterval(() => {
       ???
    }, 1000 + par1)
  
}

On resolve, the value of 2x par1 is returned (if par1 was 500, resolving the asynchronous function returns 1000). Whenever the setInterval took more than 25 seconds, the asynchronous function will reject with an Error("Server Timeout")

We also need to create another function that uses callback 

function asyncCB(par1, cb) {
  asyncPromise(par1)
}

it will call the asyncPromise and once it resolves or rejects, it will call the callback

function myCallback(err, result) {
	if (err) {
		console.log(`ERR: ${err.message}`);
  } else {
		console.log(`SUCCESS: ${result}`);
  }
}

----
the entire code will be utilized with the following sample call
asyncCB(30, myCallback)