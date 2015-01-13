SCSS_DIR=static
CSS_DIR=static

collectstatic: compile-scss
	./manage.py collectstatic --noinput

compile-scss:
	compass compile --sass-dir $(SCSS_DIR) --css-dir $(CSS_DIR) -e production --no-sourcemap --force

compile-scss-debug:
	compass compile --sass-dir $(SCSS_DIR) --css-dir $(CSS_DIR) -e development --sourcemap --force

watch-scss:
	compass watch --sass-dir $(SCSS_DIR) --css-dir $(CSS_DIR) -e production --no-sourcemap --force

.PHONY: collectstatic compile-scss compile-scss-debug watch-scss run install
