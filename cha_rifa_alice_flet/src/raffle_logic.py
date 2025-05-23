class RaffleManager:
    def __init__(self):
        self.selected_numbers = []

    def select_number(self, n):
        if n in self.selected_numbers:
            self.selected_numbers.remove(n)
        else:
            self.selected_numbers.append(n)

    def total_value(self):
        return 35 * len(self.selected_numbers)
