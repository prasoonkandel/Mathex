#include <iostream>
#include <string>
#include <iomanip>

using namespace std;

float distance(float value, string unit_from, string unit_to) {
if (unit_from =="mile"){

    if (unit_to =="foot"){
        return value * 5280;
    } else if (unit_to =="inch"){
        return value * 63360;
    } else if (unit_to == "mm"){
        return value * 1609344;
    } else if (unit_to == "cm"){
        return value * 160934.4;
    } else if (unit_to == "m"){
        return value * 1609.344;
    } else if (unit_to == "km"){
        return value * 1.609344;
    }
    else if(unit_to == "mile"){
        return value;
    } else {
        return -1;  // Error code
    }
}
else if (unit_from =="foot"){

    if (unit_to =="foot"){
        return value;
    } else if (unit_to =="inch"){
        return value * 12;
    } else if (unit_to == "mm"){
        return value * 304.8;
    } else if (unit_to == "cm"){
        return value * 30.48;
    } else if (unit_to == "m"){
        return value / 3.28084;
    } else if (unit_to == "km"){
        return value / 3280.84;
    }
    else if(unit_to == "mile"){
        return value / 5280;
    } else {
        return -1;
    }
} else if (unit_from=="inch")
{
    if (unit_to =="foot"){
        return value / 12;
    } else if (unit_to =="inch"){
        return value;
    } else if (unit_to == "mm"){
        return value * 25.4;
    } else if (unit_to == "cm"){
        return value * 2.54;
    } else if (unit_to == "m"){
        return value / 39.3701;
    } else if (unit_to == "km"){
        return value / 39370.1;
    }
    else if(unit_to == "mile"){
        return value / 63360;
    } else {
        return -1;
    }

}else if (unit_from=="mm")
{
    if (unit_to =="foot"){
        return value / 304.8;
    } else if (unit_to =="inch"){
        return value / 25.4;
    } else if (unit_to == "mm"){
        return value;
    } else if (unit_to == "cm"){
        return value / 10;
    } else if (unit_to == "m"){
        return value / 1000;
    } else if (unit_to == "km"){
        return value / 1000000;
    }
    else if(unit_to == "mile"){
        return value / 1609344;
    } else {
        return -1;
    }

} else if (unit_from=="cm")
{
    if (unit_to =="foot"){
        return value / 30.48;
    } else if (unit_to =="inch"){
        return value / 2.54;
    } else if (unit_to == "mm"){
        return value * 10;
    } else if (unit_to == "cm"){
        return value;
    } else if (unit_to == "m"){
        return value / 100;
    } else if (unit_to == "km"){
        return value / 100000;
    }
    else if(unit_to == "mile"){
        return value / 160934.4;
    } else {
        return -1;
    }

} else if (unit_from=="m")
{
    if (unit_to =="foot"){
        return value * 3.28084;
    } else if (unit_to =="inch"){
        return value * 39.3701;
    } else if (unit_to == "mm"){
        return value * 1000;
    } else if (unit_to == "cm"){
        return value * 100;
    } else if (unit_to == "m"){
        return value;
    } else if (unit_to == "km"){
        return value / 1000;
    }
    else if(unit_to == "mile"){
        return value / 1609.344;
    } else {
        return -1;
    }

} else if (unit_from=="km")
{
    if (unit_to =="foot"){
        return value * 3280.84;
    } else if (unit_to =="inch"){
        return value * 39370.1;
    } else if (unit_to == "mm"){
        return value * 1000000;
    } else if (unit_to == "cm"){
        return value * 100000;
    } else if (unit_to == "m"){
        return value * 1000;
    } else if (unit_to == "km"){
        return value;
    }
    else if(unit_to == "mile"){
        return value / 1.609344;
    } else {
        return -1;
    }

} else {
    return -1;
}
}

void displayMenu() {
    cout << "\n========================================\n";
    cout << "     DISTANCE UNIT CONVERTER\n";
    cout << "========================================\n";
    cout << "Supported Units:\n";
    cout << "  1. mile   2. km     3. m\n";
    cout << "  4. cm     5. mm     6. foot\n";
    cout << "  7. inch\n";
    cout << "========================================\n\n";
}

int main() {
    float value;
    string unit_from, unit_to;
    char choice;
    
    cout << "\nWelcome to Distance Unit Converter\n";
    
    
    do {

        displayMenu();
        cout << "Enter the value to convert: ";
        cin >> value;
        
        cout << "Enter the source unit: ";
        cin >> unit_from;
        
        cout << "Enter the target unit: ";
        cin >> unit_to;
        
        float result = distance(value, unit_from, unit_to);
        
        cout << "\n----------------------------------------\n";
        if (result == -1) {
            cout << "ERROR: Invalid unit(s) specified!\n";
            cout << "Please use: mile, km, m, cm, mm, foot, inch\n";
        } else {
            cout << fixed << setprecision(4);
            cout << value << " " << unit_from << " = " << result << " " << unit_to << "\n";
        }
        cout << "----------------------------------------\n\n";
        
        cout << "Do you want to convert another value? (y/n): ";
        cin >> choice;
        
    } while (choice == 'y' || choice == 'Y');
    
    cout << "\nThank you for using Distance Unit Converter!\n";
    cout << "Built by Prasoon Kandel\n\n";
    
    return 0;
}
