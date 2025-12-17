from engine import answer  

# ==== demo question for testing ==== # (it was in my book XD)

"""

If (-1, 3), (1.-1) and (5,1) are the vertices of a triangle, find the the length of the median drawn from the first vertex.


"""


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

