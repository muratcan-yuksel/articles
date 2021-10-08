We have an assignment for you.
Your assignment has been created.

You will create an application that solves a hash and finds an email address. You can use your own development tools/stack.
Here's how you do it:
Save the following information somewhere:
Your GUID: 6936bd53-d56e-4562-a53d-7df36beaa2d5
Your Slug: murat-can-yuksel-14382
Make a PUT request to http://career.dijitalgaraj.com/hash/your_slug with your GUID sent in JSON body.
The response for this request will contain a hash that you will solve and find the hidden email address.
We have splitted the hidden email address into multiple substrings, starting with first two letters and increasing by two letters in each iteration. For example:
hello@dijitalgaraj.com => he hell hello@ hello@di hello@diji ... hello@dijitalgaraj.com
We'll refer this substrings as "x" in the following clause.
Each substring is hashed with the formula: md5(md5(your_email_address) + x + md5(x)) and then added all together as the hash.

Using the information above, solve the hash, find the hidden email address and send your project to that address. The address is created uniquely for you.

Some additional tips:
The mail address can contain numbers, all english letters and special characters: + - . \_ @
Don't try to decode or reverse-engineer md5 hash to solve the problem.

Good luck.
