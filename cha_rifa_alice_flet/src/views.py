import flet as ft
from raffle_logic import RaffleManager

def main_view(page):
    raffle = RaffleManager()
    total_text = ft.Text(f"Total: R$ {raffle.total_value()}", size=20, color="#db89b9", weight="bold")
    number_buttons = []

    def atualizar_total():
        total_text.value = f"Total: R$ {raffle.total_value()}"
        page.update()

    def on_number_click(e, n):
        raffle.select_number(n)
        # Atualiza cor do botão selecionado
        for btn in number_buttons:
            if btn.data == n:
                btn.style = ft.ButtonStyle(
                    bgcolor="#ffc0cb" if n in raffle.selected_numbers else "#df7cb5"
                )
        atualizar_total()

    # Cria os botões dos números
    for i in range(1, 81):
        btn = ft.OutlinedButton(
            str(i),
            width=40,
            height=40,
            data=i,
            style=ft.ButtonStyle(
                bgcolor="#df7cb5"
            ),
            on_click=lambda e, n=i: on_number_click(e, n)
        )
        number_buttons.append(btn)
    

    # Divide os botões em linhas de 10
    rows = []
    for i in range(0, 80, 10):
        rows.append(ft.Row(number_buttons[i:i+10], spacing=8))

    return ft.Column([
        ft.Text("Chá Rifa da Alice", size=32, weight="bold", color="#db89b9"),
        *rows,
        total_text,
    ], alignment="center", horizontal_alignment="center")
