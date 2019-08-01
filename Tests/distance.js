const Gpio = require('pigpio').Gpio;


// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;

const trigger = new Gpio(18, {mode: Gpio.OUTPUT});
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

const ledR = new Gpio(17, {mode: Gpio.OUTPUT});
const ledG = new Gpio(22, {mode: Gpio.OUTPUT});
const ledY = new Gpio(27, {mode: Gpio.OUTPUT});

let dutyCycle1 = 0;
let dutyCycle2 = 0;
let dutyCycle3 = 0;
let varNum = 5;
let varNumAvg = 0;
let count = 0;
let countR = 0;
//let countRO = 1;
let countG = 0;
//let countGO = 1;
let park = 5.00;
var varNumArray = new Array(5);


trigger.digitalWrite(0); // Make sure trigger is low

const watchHCSR04 = () => {
  let startTick;

  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      varNum = (diff / 2 / MICROSECDONDS_PER_CM);
      //console.log(diff / 2 / MICROSECDONDS_PER_CM);
      
      }
  });
};

watchHCSR04();


// Trigger a distance measurement once per second
setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);



setInterval(() => {


	console.log("Cm: ", varNum); 

	if(count < 5)
	{
		count = count;
	}
	else
	{
		count = 0;
	}

	
	varNumArray[count] = varNum;

	//console.log(varNumArray);

	var i;
	var sum = 0;
	for( i = 0; i < 5; i++)
	{
		sum = sum + varNumArray[i];
	}

	varNumAvg = sum / park; 

	console.log(varNumAvg);

	if(varNumAvg < park && countR < 10 && countR % 2 == 0)
	{
		ledR.pwmWrite(0);
		ledY.pwmWrite(255);
		ledG.pwmWrite(0);
		countR++;
	}
	else if(varNumAvg < park && countR < 10 && countR % 2 != 0)
	{
		ledR.pwmWrite(0);
		ledY.pwmWrite(0);
		ledG.pwmWrite(0);
		countR++;
	}
	else if(varNumAvg < park)
	{
		ledR.pwmWrite(255);
		ledY.pwmWrite(0);
		ledG.pwmWrite(0);
		countG = 0;
		
	}
	else if(varNumAvg > park && countG < 10 && countG % 2 == 0)
	{
		ledR.pwmWrite(0);
		ledY.pwmWrite(0);
		ledG.pwmWrite(255);
		countG++;
	}
	else if(varNumAvg > park && countG < 10 && countG % 2 != 0)
	{
		ledR.pwmWrite(0);
		ledY.pwmWrite(0);
		ledG.pwmWrite(0);
		countG++;
	}
	else
	{
		ledR.pwmWrite(0);
		ledY.pwmWrite(0);
		ledG.pwmWrite(255);
		countR = 0;
		
	}

	count++;
	console.log("G: ", countG);
	console.log("R: ", countR);
	
	
	

}, 1000);



	




	
