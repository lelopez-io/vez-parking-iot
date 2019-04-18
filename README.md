# VEZ Parking IOT
### Find Very Eazy Parking
**VEZ Parking aims at helping users find parking efficiently**


## Configuring the Hardware Settings

This assumes you have a Raspberry PI W and and SD card ready and will be connecting to the Raspberry PI over SSH

**Setting up Linux**

1. Download the latest verision of [Raspbian Stretch Lite](https://downloads.raspberrypi.org/raspbian_lite_latest)
2. Download [balenaEtcher](https://www.balena.io/etcher/)
3. Open up balenaEtcher then select the Raspbian ISO and SD to flash to

**Setting up SSH**
1. With the SD card still plugged in to your computer, navigate to its `boot` directory
2. Create and empty file with no extenstion, name it `ssh`

**Setting up USB ethernet**
[link](https://desertbot.io/blog/headless-pi-zero-ssh-access-over-usb-windows)

**Setting up WIFI (optional)**
1. In the same `boot` directory create a file called `wpa_supplicant.conf`
2. Add these config settings, just change the `ssid` & `psk`
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
	ssid="Your network SSID"
	psk="Your WPA/WPA2 security key"
	key_mgmt=WPA-PSK
}
```

## Connecting to the Hardware

At this point you should be ready to connect to the hardware so long as you computer is on the same WIFI network you set on the .conf file. Plug in the SD card to the PI and then connect to it.
> Note: I use a Mac so I know it will resolve the DNS correctly by using raspberrypi.local on a small network. If working with multiple devices insert the IP address after the @. Also I'm not sure what additional steps are required for PC to connect at the moment.

**On a Mac**
1. Open up a terminal
2. Enter `ssh pi@raspberrypi.local`


**On a PC**
1. Use Putty or Win10 SHH
2. enter `ssh pi@IP`

> Note: Serial Connection may also be an option

## Installing Git
At this point you should be able to connect to the Raspberry pi using SSH
`sudo apt install git`

## Installing Node.js

At this point you should be able to SSH into the Raspberry PI W and execute comands.
1. Copy the download link for the latest LTS ARMv6 Node.js binary from [here](https://nodejs.org/en/download/)
2. Execute the following commands to download, extract, and install 
```bash
wget https://nodejs.org/dist/vX.X.X/node-vX.X.X-linux-armv6l.tar.xz	# use the download link copied earlier
tar -xf node-vX.X.X-linux-armv6l.tar.xz					# vX.X.X should be the version you dowload above
sudo mv node-vX.X.X-linux-armv6l /usr/local/node
cd /usr/bin
sudo ln -s /usr/local/node/bin/node node
sudo ln -s /usr/local/node/bin/npm npm
node -v  # Verifying that the Node.js install worked
npm -v   # Verifying that the npm install worked
```

## Installing dependencies
Now that we have node and npm installed we are able to install other JavaScript packages to help get us up and running. There are three we need to get the HC-SR04 to work:
1. johnny-five (JavaScript platform for Robotics & IOT)
2. raspi-io (helps johnny-five work with raspberry pi)
3. pi-io  (helps johnny-five use proximity sensors on the pi)


> Note: use these commands if starting from scratch ()
```bash
mkdir project-folder # make a folder to work in
cd project-folder
npm install johnny-five raspi-io pi-io
```
> Note: use this if downloading code from vez repo (currently no code exist so use above method to start)
```bash
git clone https://github.com/lelopez-io/vez-parking-iot.git
cd vez-parking-iot.git
npm install 		# this installes the packages in package.json
```

> Note: we must restart the PI after installing raspi-io 

## Start writing JavaScript to control GPIOs on the PI
While in the project folder create a new file using the command `touch proximity.js` then save the following code to that file.

> Note: we are only using pi-io in this case since raspi-io thows an error when trying to use the .Proximity function.

```javascript
const five = require('johnny-five');
const PiIO = require('pi-io');

const board = new five.Board({
  io: new PiIO()
});

board.on('ready', () => {
  const proximity = new five.Proximity({
    controller: PiIO.HCSR04,
    triggerPin: 'GPIO18',
    echoPin: 'GPIO24'
  });


  proximity.on("change", function() {
    console.log("cm: ", this.cm);
  });

});
```

## Finally run the code
> Note: all files that access GPIOs must be ran using sudo

`sudo node proximity.js`






