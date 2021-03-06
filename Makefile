ELEVENTY_FLAGS =
WEBPACK_FLAGS =

default: watch

build:
	nodemon build.js

build-npm:
	cd node_modules/feed && npm install && npm run build

clean:
	rm -rf build

debug:
	DEBUG=Eleventy* concurrently "webpack $(WEBPACK_FLAGS) --watch" "eleventy $(ELEVENTY_FLAGS) --serve"

lint:
	eslint scripts
	stylelint styles

serve:
	nodemon watch.js

wip:
	git add .; git commit -m "wip"; git push

.PHONY: default build build-npm clean debug serve wip
