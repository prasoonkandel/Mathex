import matplotlib.pyplot as plt

import numpy as np

# This is a bar graph for English marks of students 

print("""
██████   █████  ██████       ██████  ██████   █████  ██████  ██   ██     ███    ███  █████  ██   ██ ███████ ██████  
██   ██ ██   ██ ██   ██     ██       ██   ██ ██   ██ ██   ██ ██   ██     ████  ████ ██   ██ ██  ██  ██      ██   ██ 
██████  ███████ ██████      ██   ███ ██████  ███████ ██████  ███████     ██ ████ ██ ███████ █████   █████   ██████  
██   ██ ██   ██ ██   ██     ██    ██ ██   ██ ██   ██ ██      ██   ██     ██  ██  ██ ██   ██ ██  ██  ██      ██   ██ 
██████  ██   ██ ██   ██      ██████  ██   ██ ██   ██ ██      ██   ██     ██      ██ ██   ██ ██   ██ ███████ ██   ██ 
                                                                                                                    
                                                                                                                    """)

def plotgraph(x,y):

    plt.bar(x, y, color='#B52605', width=0.4)



    plt.xlabel("Names", fontfamily="DejaVu Sans",color="#411B00",weight="bold", fontsize=12)
    plt.ylabel("Marks of English",color="#411B00", weight="bold", fontfamily="DejaVu Sans", fontsize=12)
    plt.title("Bar Graph of English Marks",
            fontfamily="DejaVu Sans",
            color="#0A1172", weight="bold",
            fontsize=16)

    plt.xticks(fontfamily="DejaVu Sans", fontsize=11,weight="bold")
    plt.yticks(fontfamily="DejaVu Sans", fontsize=11,weight="bold")





def savefile():
    plt.savefig("test.png", dpi=300, bbox_inches="tight")

n = int(input("Enter number of students: "))
names = []
marks = []

for i in range(n):
    name = input(f"Enter name of student {i+1}: ")
    mark = float(input(f"Enter English marks of {name}: "))
    names.append(name)
    marks.append(mark)

plotgraph(names, marks)

choice = input("Do you want to save the graph as an image file? (y/n): ").lower()

if choice == 'y':
    savefile()
    print("Graph saved as 'test.png'")

else:
    print("Graph not saved.")


