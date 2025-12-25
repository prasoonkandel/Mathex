import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import base64
from io import BytesIO

def plotchart(labels, values, title="Pie Chart"):
    plt.figure(figsize=(8, 6))
    
    plt.pie(
        values,
        labels=labels,
        autopct='%1.1f%%',
        startangle=90,
        textprops={'fontfamily': 'DejaVu Sans', 'fontsize': 14, 'weight': 'bold'},
        wedgeprops={'edgecolor': 'black', 'linewidth': 2}
    )
    
    plt.title(
        title,
        fontfamily="DejaVu Sans",
        color="#0A1172",
        weight="bold",
        fontsize=16
    )
    
    plt.axis('equal')
    plt.tight_layout()

def generate_chart(labels, values, title="Pie Chart"):
    plotchart(labels, values, title)
    
    img_buffer = BytesIO()
    plt.savefig(img_buffer, format='png', dpi=300, bbox_inches="tight")
    img_buffer.seek(0)
    
    img_base64 = base64.b64encode(img_buffer.read()).decode('utf-8')
    plt.close()
    
    return img_base64

def savefile(labels, values, title="Pie Chart", filename="pie_chart.png"):
    plotchart(labels, values, title)
    plt.savefig(filename, dpi=300, bbox_inches="tight")
    plt.close()


if __name__ == "__main__":
    labels = []
    values = []

    random_values = np.random.randint(10, 100, size=5)

    for i in range(len(random_values)):
        labels.append(f"Item {i + 1}")
        values.append(random_values[i])

    savefile(labels, values, title="Random NumPy Data", filename="sample_pie_chart.png")