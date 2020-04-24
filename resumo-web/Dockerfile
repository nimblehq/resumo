FROM ruby:2.6.5-slim

ARG BUILD_ENV=development
ARG RUBY_ENV=development

# Define all the envs here
ENV BUILD_ENV=$BUILD_ENV \
    RACK_ENV=$RUBY_ENV \
    RAILS_ENV=$RUBY_ENV \
    APP_HOME=/app \
    PORT=80 \
    BUNDLE_JOBS=4 \
    BUNDLE_PATH="/bundle" \
    LANG="en_US.UTF-8" \
    LC_ALL="en_US.UTF-8" \
    LANGUAGE="en_US:en"

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends apt-transport-https curl gnupg net-tools && \
    apt-get install -y --no-install-recommends build-essential libpq-dev && \
    apt-get install -y --no-install-recommends rsync locales chrpath pkg-config libfreetype6 libfontconfig1 git cmake wget unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends python3 python3-pip python3-setuptools && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    pip3 install -U pipenv

WORKDIR $APP_HOME

# Move gemfile into place
COPY Gemfile* ./

# Skip installing gem documentation
RUN mkdir -p /usr/local/etc \
	&& { \
    echo '---'; \
    echo ':update_sources: true'; \
    echo ':benchmark: false'; \
    echo ':backtrace: true'; \
    echo ':verbose: true'; \
    echo 'gem: --no-ri --no-rdoc'; \
		echo 'install: --no-document'; \
		echo 'update: --no-document'; \
	} >> /usr/local/etc/gemrc

# Install Ruby gems
RUN gem install bundler && \
    if [ "$BUILD_ENV" = "production" ]; then \
      bundle install --jobs $BUNDLE_JOBS \
                     --path $BUNDLE_PATH \
                     --without development test \
                     --deployment ; \
    else \
      bundle install --jobs $BUNDLE_JOBS \
                     --path $BUNDLE_PATH ; \
    fi

# Move the Pipfile and Pipfile.lock into the image
COPY Pipfile* ./

# Install Python dependencies
RUN pipenv install --system --deploy && \
    python3 -m spacy download en_core_web_sm

# # Copying the app files must be placed after the dependencies setup
# # since the app files always change thus cannot be cached
COPY . ./

EXPOSE $PORT

CMD ./bin/start
