---
title: "Customised PiBow case for Raspberry Pi + PiJuice + PiTFT"
unsplashImageId: Mzy-OjtCI70
date: 2020-12-27
permalink: blog/customized-pibow-case-for-raspberry-pi-pijuice-pitft/index.html
featured: true
tags: tinkering
syndication:
  - https://twitter.com/pietvanzoen/status/1343960378280173571

---

I recently setup a [PiHole](https://pi-hole.net) for my home network. I’m using a Raspberry Pi 3B+ with a PiJuice and a 3.5 inch PiTFT screen. Finding a case to fit all these was a little tricky. I don’t have a 3D printer (yet) and the tall cases I could find were a bit ugly.

I ended up using a PiBow case designed for PiTFT and made a couple modifications to get it to work with the PiJuice. I’m pretty happy with the result and wanted to share it.

<!-- excerpt -->

## What I used

_Links are to where I purchased._

* Raspberry Pi 3b
* [PiJuice](https://www.tinytronics.nl/shop/en/raspberry-pi/power-supplies/pijuice-hat-raspberry-pi-battery-module)
* [PiTFT 3.5”](https://www.elektor.nl/adafruit-pitft-plus-480x320-3-5-tft-touchscreen-for-rpi)
* [PiBow PiTFT+ case](https://shop.pimoroni.com/products/pibow-pitft)
* [PiBow Lego base](https://shop.pimoroni.com/products/pibow-modification-layers?variant=1048948309) (optional)
* [3x PiBow expansion layers](https://shop.pimoroni.com/products/pibow-modification-layers?variant=1039417249)
* [Longer PiBow screws](https://shop.pimoroni.com/products/pibow-extender-bolt-pack)
* [Some M2.5 washers, standoffs, and screws](https://www.amazon.nl/gp/product/B07PDVXVZ5/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1)

## The build

Before starting, be sure to remove the protective film from each of the layers of the PiBow. I put this all together with the film attached and had to redo the whole thing. 🤦 Fortunately this gave me the opportunity to take photos of the process.

Here’s the mess of stuff I started with.

![My desk scattered with raspberry pi parts for this project](/images/blog/pihole-case-01.jpeg)

Mount the PiJuice on the raspberry pi with Layer 3 of the PiBow in-between. Use the nylon standoffs and screws that come with the PiJuice.


![Raspberry Pi with PiJuice attached](/images/blog/pihole-case-02.jpeg)

Turn the Pi over and use 5mm stand offs to secure the PiJuice to the Raspberry Pi.

![The underside of the Raspberry Pi with standoff bolts attached.](/images/blog/pihole-case-03.jpeg)

On the PiBow layers you’ll see numbers etched on the tops. Add layers 2, 1, and the base. I have the [Lego PiBow base](https://shop.pimoroni.com/products/pibow-modification-layers?variant=1048948309) but the regular base will work too. Be careful to put the Lego base the right way up or it won’t work.

![The underside of the Raspberry Pi with PiBow layers attached](/images/blog/pihole-case-04.jpeg)
![The underside of the Raspberry Pi with PiBow base attached](/images/blog/pihole-case-05.jpeg)

Secure the base using the extended PiBow bolts in the corners *and* use M2.5 screws going into the standoffs to secure the Raspberry Pi and PiJuice.

![The underside of the Raspberry Pi with PiBow base attached with all screws and bolts added](/images/blog/pihole-case-06.jpeg)

Rather than using layers 4, 5, 6, and 7 that come with the PiBow kit, we’ll use 4 nylon washers on each corner bolt. Because of the buttons and power socket on the PiJuice I couldn’t use the standard PiBow layers that normally surround the Raspberry Pi HDMI and power ports.

![Raspberry Pi with PiBow case bottom assembled and washers on vertical corner bolts.](/images/blog/pihole-case-07.jpeg)

Now add layer 7 and three clear expansion layers. These layers will surround the PiTFT.

![Raspberry Pi with PiJuice and PiBow extension layers](/images/blog/pihole-case-08.jpeg)

For the PiTFT to fit on top of the PiJuice I had to carefully clip the 26 pins on the back of the screen.

![Back of PiTFT screen with pins clipped.](/images/blog/pihole-case-09.jpeg)

Finally I used layer 9 and secured it all using the nylon bolts.

![Raspberry Pi with PiJuice and PiTFT attached in PiBow case.](/images/blog/pihole-case-10.jpeg)

## Done!

That’s it! Pretty good looking if I say so myself. :) Especially running with no cables and [PADD](https://github.com/pi-hole/PADD) on the display.

![Raspberry Pi corner view](/images/blog/pihole-case-11.jpeg)
![Raspberry Pi side view](/images/blog/pihole-case-12.jpeg)
![Raspberry Pi top view](/images/blog/pihole-case-13.jpeg)

Here’s the PiHole running. To mount the Pi I attached a flat piece of Lego to the wall in my utility closet using some removable adhesive strips.

![Raspberry Pi attached to wall in utility closet.](/images/blog/pihole-case-14.jpeg)

I may find some slightly longer bolts in the future because I’d like to add the last clear layer included in the PiBow kit. The extended bolts weren’t quite long enough.

_Questions? Comments? Post a message below or ping me on [twitter](https://twitter.com/pietvanzoen)._
