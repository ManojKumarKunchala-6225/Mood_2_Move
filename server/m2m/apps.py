from django.apps import AppConfig


class M2MConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'm2m'
def ready(self):
    print("✅ hello world from the m2m app!")