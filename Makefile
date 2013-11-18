test.unit:
	@./node_modules/.bin/mocha -R spec test/unit/*.test.js

test.integration:
	@./node_modules/.bin/mocha -R spec test/integration/*.test.js --timeout 15000

test:
	@./node_modules/.bin/mocha -R spec test/*/*.test.js --timeout 15000

.PHONY: test.unit test.integration test
