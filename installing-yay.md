Install a Package from AUR via Command Line
Now it’s time to learn how to install AUR packages via command line. You can install packages from the AUR manually by using git and makepkg, or use an “AUR helper” program which streamlines the process. One we like to use is called “yay,” so that’s the method we’ll be covering in this section. You’ll also see how to do the manual method, since we must use it in order to install yay in the first place.

Let’s start by installing yay with these steps:

Open a terminal and execute this command to install git:
$ sudo pacman -S git
Then, clone the yay git repository:
$ git clone https://aur.archlinux.org/yay-git.git
Change directory into the newly created yay-git folder and execute the makepkg command like so:
$ cd yay-git
$ makepkg -si
yay will now be installed. You can expect it to take some time, as it will have to download all the necessary dependencies as well. Now we can use yay to install a package from the AUR. Let’s stick with our previous example of installing Dropbox.

Open a terminal and use the following command to install Dropbox or some other package from the AUR:

$ yay -S dropbox
