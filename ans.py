import webbrowser
from back import answer  

def mathex():

    print(r"""
  __  __       _   _                          _____
 |  \/  |     | | | |                   /\   |_   _|
 | \  / | __ _| |_| |__   __ __  __    /  \    | |
 | |\/| |/ _` | __| '_ \ / _ \ \/ /   / /\ \   | |
 | |  | | (_| | |_| | | |  __/>  <   / ____ \ _| |_
 |_|  |_|\__,_|\__|_| |_|\___/_/\_\ /_/    \_\_____|
""")

    print("Type something (type 'bye' to exit)\n")

    while True:

        command = input("You: ")

        if command.lower() == "bye":
            print("Mathex AI: Goodbye! 👋")
            break

        try:

            message = answer(command)

 
            message = str(message).strip()
            print(f"Mathex AI:\n{message}")

        except Exception as e:
            print(f"Mathex AI: Oops! Something went wrong: {e}")

if __name__ == "__main__":
    mathex()