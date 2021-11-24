## to set PATH permanently

so that I doN't need to export PATH="/home/sirius/.local/share/gem/ruby/3.0.0/bin:$PATH" each time I want to use rails on reboot:

I added the following => PATH="/home/sirius/.local/share/gem/ruby/3.0.0/bin:$PATH"

(without export as you can see)
to ~/.profile , ~/.bashrc , and ~/.bash_profile
Don't know which one solved the problem. But it is solved anyway.
EDIT=> seems that in ~/.profile, it is still with export => export PATH="/home/sirius/.local/share/gem/ruby/3.0.0/bin:$PATH"
Still, doN't know what is the correct way to do, so I'm not gonna touch it.
