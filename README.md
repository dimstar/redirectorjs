# redirectorjs

This handy little guy helps you to create redirections with a regex and a csv file. 

## First Step

You'll need to edit the redirector.js file's two variables:

> const **REGEX_SEARCH**\
> const **REPLACE_WITH**

These control the regex that is providing a string match and a replacement string. 

## Last Step
Now comes the fun part. ask the redirector for help, and you'll get...

> **I am the redirector**, I create **redirections** from **csv files**\
> give me a read file in _argv1_ and an output file in _argv2_, like so:\
> `:~$ node redirection.js input-urls.csv my-output.csv`\
> give me nothing and that is just what you'll get in return


## Happy redirecting!

This little tool is primarily for use with wordpress's yoast plugin and its redirection import. 
Of course you could use it to other ends.