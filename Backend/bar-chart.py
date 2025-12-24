import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  
import numpy as np
import base64
from io import BytesIO

def plotgraph(x, y, xlabel="Names", ylabel="Values", title="Bar Graph", color='#B52605'):
  
    plt.figure(figsize=(10, 6))
    plt.bar(x, y, color=color, width=0.4)

    plt.xlabel(xlabel, fontfamily="DejaVu Sans", color="#411B00", weight="bold", fontsize=12)
    plt.ylabel(ylabel, color="#411B00", weight="bold", fontfamily="DejaVu Sans", fontsize=12)
    plt.title(title, fontfamily="DejaVu Sans", color="#0A1172", weight="bold", fontsize=16)

    plt.xticks(fontfamily="DejaVu Sans", fontsize=11, weight="bold")
    plt.yticks(fontfamily="DejaVu Sans", fontsize=11, weight="bold")
    plt.tight_layout()

def generate_chart(x, y, xlabel="Names", ylabel="Values", title="Bar Graph", color='#B52605'):

    plotgraph(x, y, xlabel, ylabel, title, color)
    
  
    img_buffer = BytesIO()
    plt.savefig(img_buffer, format='png', dpi=300, bbox_inches="tight")
    img_buffer.seek(0)
    
    img_base64 = base64.b64encode(img_buffer.read()).decode('utf-8')
    plt.close()
    
    return img_base64

def savefile(filename="chart.png"):

    plt.savefig(filename, dpi=300, bbox_inches="tight")
    plt.close()
