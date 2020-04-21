from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'corsheaders',  # 追加
    'django_filters',
    'djoser',
    'rest_framework',

    'apiv1.apps.Apiv1Config',
    'clubs.apps.ClubsConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # 追加
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'djangoVueApp',
        'USER': 'user',
        'PASSWORD': 'user',
        'HOST': 'db',
        'PORT': 3306,
    }
}

# CORS
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8080',
    'http://127.0.0.1:8080',
)

# Media files
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# REST Framework
SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=180),  # トークン有効時間を３時間に
}
