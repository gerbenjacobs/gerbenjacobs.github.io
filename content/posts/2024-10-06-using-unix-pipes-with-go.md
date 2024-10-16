---
title: "Using Unix pipes with Go"
date: 2024-10-06T12:00:00+02:00
layout: post
description: Built your own Unix tool that allows data to be piped via stdin and stdout
headerImage: img/6034711842_c3d1719f75_c.jpg
tags: ["tech", "go", "unix", "tutorial", "open-source"]
slug: using-unix-pipes-with-go
toc: true
comment: true
---
_Header by [Alan Levine CC BY 2.0](https://www.flickr.com/photos/cogdog/6034711842/)_

Go has made it easy to work with Unix operations, it comes with the platform-independent built-in package `os` to interface with the operating system.

They offer nice features such as `os.Stdin` and `os.Stdout`, wrappers of type `os.File` around the OS's common standard streams.

The `os/exec` package is also great. It allows you to run Unix-tools from within your Go application.
> Package exec runs external commands. It wraps os.StartProcess to make it easier to remap stdin and stdout, connect I/O with pipes, and do other adjustments. 

We however are only going to read and write from _standard out_.

## 📒 Course

At work I wanted to teach some Go as well as show off cross-compiling. 
Since the audience is a mix of developers and system engineers I figured I'd make a CLI tool that touches on a few things.

> This course will show you how to make a Go binary that acts as a unix tool.
>
> We will read data from `stdin`, convert it to our custom JSON model and push it through to `stdout`, completing the cycle.
>
> _This is a beginner to intermediate course for both Go and Unix, some things will be explained, but if you're unsure you should be able to autonomously search for the right information._

If you want to do this course/tutorial for yourself, you can find it at https://github.com/gerbenjacobs/unix-pipe-course

⚠️ The rest of this post contains spoilers.

## 🔩 Pipes

In case you're not familiar with piping, it allows you to combine multiple programs in a chain using the pipe-symbol "`|`" and in essence create a 'pipeline'.

Data from one program gets sent on the 'stdout' and back into the 'stdin' for the next program.

You might have already used this unknowingly while pretty-printing a cURL response:

```sh 
curl -s https://dummyjson.com/test | jq
```

## 📝 Reading and writing

Since `os.Stdin` is a `os.File` we can use a myriad of methods that deal with this. 
Assuming we are in control of what the input is (i.e. don't expect 100GB dumps), we can use `io.ReadAll` to read the data straight into memory.

```go
package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	data, err := io.ReadAll(os.Stdin)
	if err != nil {
		fmt.Printf("failed to read data: %v", err)
		return
	}

	fmt.Printf("Input: %#v | len(%d)", string(data), len(data))
}
```

And that's __literally__ it for the reading part.

We've learned to use a `io.ReadAll` (which implements the `io.Reader` interface) in combination with `stdin`, 
but for writing we'll need to use a `io.Writer`.

Since we know we're going to use JSON we can have a look at the `encoding/json` [package](https://pkg.go.dev/encoding/json).

You're probably familiar with `json.Marshal` but the package also comes with an `json.Encoder`, 
that needs to be initialized with a `io.Writer` interface.

We can use the `os.Stdout` file descriptor for this, cause as you remember, it's a wrapper around `os.File`
and those adhere to the `io.Writer` interface.


```go
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

type Output struct {
	Message string `json:"message"`
	Length  int    `json:"len"`
}

func main() {
	data, err := io.ReadAll(os.Stdin)
	if err != nil {
		fmt.Printf("failed to read data: %v", err)
		return
	}

	enc := json.NewEncoder(os.Stdout)
	err = enc.Encode(Output{
		Message: string(data),
		Length:  len(data),
	})
	if err != nil {
		fmt.Printf("failed to encode json: %v", err)
	}
}
```

In this example we pretend there's a reason for us to create a custom JSON object with the special `message` and `len` names.

We create a `json.Encoder` where the output stream is `os.Stdout` and we call `Encode()` with an inlined `Output`-struct.

We make sure we typecast our `[]byte` data as 'string' and in case there are no errors, we have succesfully written to 'standard out'.

## ✔️ Result

When piping "Hello World" to our program using `echo` and outputting our work to `jq` (a pretty-printer for JSON), we will get the following.

```sh
echo -n "Hello World" | go run main.go | jq
```

```json
{
    "message": "Hello World",
    "len": 11
}
```

Now if you build your Go program and call it 'json_encoder' it will look even more like you're doing regular ol' Unix piping!

```sh
cat important_business.txt | json_encoder | jq
```

Congratulations! Your Go program is now pipable, you're a pipe in a bigger Unix pipeline.

_If you want to know more about __cross-compiling__ check [step 3 of the course](https://github.com/gerbenjacobs/unix-piping-course/tree/main/step3)._
