
/*  I firstly decided to make my projects form java and made a array sorter with smart logic but 
I think i will go with python beacuse my idea is changed and now python is better for that */

// Anyways here is the code (I used bubble sort method for sorting array)
import java.util.Scanner;

public class learn {
    public static void main(String[] args) {

      // Some fancy stuff xd 

      System.out.print("  ____        _     _     _         _____            _   \n" + //
                " |  _ \\      | |   | |   | |       / ____|          | |  \n" + //
                " | |_) |_   _| |__ | |__ | | ___  | (___   ___  _ __| |_ \n" + //
                " |  _ <| | | | '_ \\| '_ \\| |/ _ \\  \\___ \\ / _ \\| '__| __|\n" + //
                " | |_) | |_| | |_) | |_) | |  __/  ____) | (_) | |  | |_ \n" + //
                " |____/ \\__,_|_.__/|_.__/|_|\\___| |_____/ \\___/|_|   \\__|\n" + //
                "                                                         \n" + //
                "                                                         \n \n");
        
        int numbs[] = new int[20];
        int n;
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter how many numbers you want to input: ");
        n = scanner.nextInt();
 
        for (int i = 0; i < n; i++) {
          int inum = i + 1;
          if (inum%10 == 1){

            if (inum==11 || inum%100==11) {
              System.out.print("Enter " + inum + "th number: ");
              }
            else{
              System.out.print("Enter " + inum + "st number: ");
              
            }
          }
          else if (inum%10 == 2 || inum%100 == 12){

            if (inum==12) {
              System.out.print("Enter " + inum + "th number: ");

              }
            else{
              System.out.print("Enter " + inum + "nd number: ");
              
            }
          }
          else if (inum%10 == 3 || inum%100 == 13){   

            if (inum==13) {
              System.out.print("Enter " + inum + "th number: ");
              }
            else{
              System.out.print("Enter " + inum + "rd number: ");
              
            }
          }
          else{

            System.out.print("Enter " + inum + "th number: ");

          }
            

          numbs[i] = scanner.nextInt();


        }
        int temp;
        for (int i = 0; i < n - 1; i++) 
          {

          for (int j = 0; j < n - i - 1; j++)
             {
            if (numbs[j] > numbs[j + 1]) {
 
              temp = numbs[j];
              numbs[j] = numbs[j + 1];
              numbs[j + 1] = temp;
            }

          }
        }
        System.out.print("The numbers entered are sorted \n \n");
        System.out.print("Sorted Numbers\n");

        for (int i = 0; i < n; i++) {


          System.out.print(numbs[i] + "\t");


        }
              scanner.close();
    }}



