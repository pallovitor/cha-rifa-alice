import flet as ft
from views import main_view

def main(page: ft.Page):
    page.title = "Chá Rifa da Alice"
    page.theme_mode = ft.ThemeMode.LIGHT
    page.add(main_view(page))

ft.app(target=main)
