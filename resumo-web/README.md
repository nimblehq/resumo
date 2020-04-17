# README

## Development

### With Docker

```bash
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

### Without Docker

**Install Python**

Install the python version manager

```bash
brew install pyenv
pip install pipenv
```

Install Python dependencies

```bash
pipenv install
```

Start the shell in virtual environment for development

```bash
pipenv shell
```

## Deployment

```bash
# Push only the web folder to Heroku
# The image is built and deployed with the config in heroku.yml file
git push heroku `git subtree split --prefix resumo-web`:master --force
```
