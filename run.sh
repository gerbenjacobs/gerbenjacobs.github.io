# run jekyll serve with sensible defaults on any machine (including special setting for Windows volume mounts)
MSYS_NO_PATHCONV=1 docker run -p 4000:4000 -v $(pwd):/site bretfisher/jekyll-serve