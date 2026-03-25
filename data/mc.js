const MC_PROGRAMS = [
    {
        title: "1. Multiply Two 16-Bit Numbers",
        code: `; Program 1: Multiply two 16 bit binary numbers
AREA MULTIPLY, CODE, READONLY
ENTRY           ; MARK FIRST INSTRUCTION TO EXECUTE
START
    MOV R1,#6400    ; STORE FIRST NUMBER IN R1
    MOV R2,#3200    ; STORE SECOND NUMBER IN R2
    MUL R3,R1,R2    ; MULTIPLICATION
STOP B STOP
END             ; MARK END OF FILE`
    },
    {
        title: "2. Sum of First 10 Integers",
        code: `; Program 2: Find the sum of first 10 integer numbers
AREA SUM, CODE, READONLY
ENTRY
START
    MOV R1, #10     ; LOAD 10 TO REGISTER
    MOV R2, #0      ; EMPTY THE REGISTER TO STORE RESULT
LOOP
    ADD R2, R2, R1  ; ADD THE CONTENT OF R1 WITH RESULT AT R2
    SUBS R1, #0X01  ; DECREMENT R1 BY 1
    BNE LOOP        ; REPEAT TILL R1 GOES 0
STOP B STOP         ; JUMPS BACK TO C CODE
END`
    },
    {
        title: "3. Factorial of a Number",
        code: `; Program 3: Find factorial of a number
AREA FACTORIAL, CODE, READONLY
ENTRY           ; MARK FIRST INSTRUCTION TO EXECUTE
START
    MOV R0, #4      ; STORE FACTORIAL NUMBER IN R0
    MOV R1, R0      ; MOVE THE SAME NUMBER IN R1
FACT
    SUBS R1, R1, #1 ; SUBTRACTION
    CMP R1, #1      ; COMPARISON
    BEQ STOP
    MUL R3, R0, R1  ; MULTIPLICATION
    MOV R0, R3      ; RESULT
    BNE FACT        ; BRANCH TO THE LOOP IF NOT EQUAL
STOP B STOP
END             ; MARK END OF FILE`
    },
    {
        title: "4. Add Array of 16-Bit Numbers",
        code: `; Program 4: Add an array of 16 bit numbers and store 32 bit result in RAM
AREA ADDITION, CODE, READONLY
ENTRY               ; MARK FIRST INSTRUCTION TO EXECUTE
START
    MOV R5, #6      ; INTIALISE COUNTER TO 6(I.E. N=6)
    MOV R0, #0      ; INTIALISE SUM TO ZERO
    LDR R1, =VALUE1 ; LOADS THE ADDRESS OF FIRST VALUE
LOOP
    LDR R2, [R1], #2; WORD ALIGN TO ARRAY ELEMENT
    LDR R3, =MASK   ; MASK TO GET 16 BIT
    AND R2, R2, R3  ; MASK MSB
    ADD R0, R0, R2  ; ADD THE ELEMENTS
    SUBS R5, R5, #1 ; DECREMENT COUNTER
    CMP R5, #0
    BNE LOOP        ; LOOK BACK TILL ARRAY ENDS
    
    LDR R4, =RESULT ; LOADS THE ADDRESS OF RESULT
    STR R0, [R4]    ; STORES THE RESULT IN R1
XSS B XSS

MASK DCD 0X0000FFFF ; MASK MSB
VALUE1 DCW 0X1111, 0X2222, 0X3333, 0XAAAA, 0XBBBB, 0XCCCC ; ARRAY OF 16 BIT NUMBERS (N=6)

AREA DATA2, DATA, READWRITE
RESULT DCD 0X0      ; TO STORE RESULT IN GIVEN ADDRESS
END                 ; MARK END OF FILE`
    },
    {
        title: "5. Square Using Look-Up Table",
        code: `; Program 5: Find the square of a number (1 to 10) using look-up table
AREA SQUARE, CODE, READONLY
ENTRY               ; MARK FIRST INSTRUCTION TO EXECUTE
START
    LDR R0, =TABLE1 ; LOAD START ADDRESS OF LOOKUP TABLE
    LDR R1, =3      ; LOAD NO WHOSE SQUARE IS TO BE FOUND
    MOV R1, R1, LSL#0X2 ; GENERATE ADDRESS CORRESPONDING TO SQUARE OF GIVEN NO
    ADD R0, R0, R1  ; LOAD ADDRESS OF ELEMENT IN LOOKUP TABLE
    LDR R3, [R0]    ; GET SQUARE OF GIVEN NO IN R3
STOP B STOP

TABLE1
    DCD 0X00000000  ; SQUARE OF 0=0
    DCD 0X00000001  ; SQUARE OF 1=1
    DCD 0X00000004  ; SQUARE OF 2=4
    DCD 0X00000009  ; SQUARE OF 3=9
    DCD 0X00000010  ; SQUARE OF 4=16
    DCD 0X00000019  ; SQUARE OF 5=25
    DCD 0X00000024  ; SQUARE OF 6=36
    DCD 0X00000031  ; SQUARE OF 7=49
    DCD 0X00000040  ; SQUARE OF 8=64
    DCD 0X00000051  ; SQUARE OF 9=81
    DCD 0X00000064  ; SQUARE OF 10=100
END                 ; MARK END OF FILE`
    },
    {
        title: "6. Largest Number in Array",
        code: `; Program 6: Find the largest number in an array of 32 numbers
AREA LARGEST, CODE, READONLY
ENTRY               ; MARK FIRST INSTRUCTION TO EXECUTE
START
    MOV R5, #6      ; INTIALISE COUNTER TO 6(I.E. N=7)
    LDR R1, =VALUE1 ; LOADS THE ADDRESS OF FIRST VALUE
    LDR R2, [R1], #4; WORD ALIGN TO ARRAY ELEMENT
LOOP
    LDR R4, [R1], #4; WORD ALIGN TO ARRAY ELEMENT
    CMP R2, R4      ; COMPARE NUMBERS
    BHI LOOP1       ; IF THE FIRST NUMBER IS > THEN GOTO LOOP1
    MOV R2, R4      ; IF THE FIRST NUMBER IS < THEN MOV CONTENT R4 TO R2
LOOP1
    SUBS R5, R5, #1 ; DECREMENT COUNTER
    CMP R5, #0      ; COMPARE COUNTER TO 0
    BNE LOOP        ; LOOP BACK TILL ARRAY ENDS
    
    LDR R4, =RESULT ; LOADS THE ADDRESS OF RESULT
    STR R2, [R4]    ; STORES THE RESULT IN R2
XSS B XSS

VALUE1
    DCD 0X44444444  ; ARRAY OF 32 BIT NUMBERS (N=7)
    DCD 0X22222222
    DCD 0X11111111
    DCD 0X33333333
    DCD 0XAAAAAAAA
    DCD 0X88888888
    DCD 0X99999999

AREA DATA2, DATA, READWRITE
RESULT DCD 0X0      ; TO STORE RESULT IN GIVEN ADDRESS
END                 ; MARK END OF FILE`
    },
    {
        title: "7. Internal UART (Hello World)",
        code: `// Program 7: Display "Hello World" message using Internal UART
#include <lpc214x.h>

void uart_interrupt(void) __irq;
unsigned char temp;
unsigned char rx_flag=0, tx_flag=0;

int main(void)
{
    PINSEL0 = 0X00000005; // select TXD0 and RXD0 lines
    U0LCR = 0X00000083;   // enable baud rate divisor loading and select data format
    U0DLM = 0X00;
    U0DLL = 0x13;         // select baud rate 9600 bps
    U0LCR = 0X00000003;
    U0IER = 0X03;         // select Transmit and Receive interrupt
    
    VICVectAddr0 = (unsigned long)uart_interrupt; // UART 0 INTERRUPT
    VICVectCntl0 = 0x20 | 6;                      // Assign the VIC channel uart-0
    VICIntEnable = 0x00000040;                    // Enable the uart-0 interrupt
    
    rx_flag = 0x00;
    tx_flag = 0x00;
    
    while(1)
    {
        while(rx_flag == 0x00); // wait for receive flag to set
        rx_flag = 0x00;         // clear the flag
        while(tx_flag == 0x00); // wait for transmit flag to set
        tx_flag = 0x00;         // clear the flag
    }
}

void uart_interrupt(void) __irq
{
    temp = U0IIR;
    temp = temp & 0x06;
    if(temp == 0x02)
    {
        tx_flag = 0xff;
        VICVectAddr = 0;
    }
    else if(temp == 0x04)
    {
        U0THR = U0RBR;
        rx_flag = 0xff;
        VICVectAddr = 0;
    }
}`
    },
    {
        title: "8. Stepper Motor Interface",
        code: `// Program 8: Interface a Stepper motor and rotate it (Clockwise/Anti-clockwise)
#include <LPC21xx.H>

void clock_wise(void);
void anti_clock_wise(void);
unsigned long int var1, var2;
unsigned int i=0, j=0, k=0;

int main(void)
{
    PINSEL0 = 0x00FFFFFF; // P0.12 to P0.15 GPIO
    IO0DIR |= 0x0000F000; // P0.12 to P0.15 output
    while(1)
    {
        for(j=0; j<50; j++) // 50 times in Clock wise Rotation
            clock_wise();
        for(k=0; k<65000; k++); // Delay to show anti_clock Rotation
        for(j=0; j<50; j++) // 50 times in Anti Clock wise Rotation
            anti_clock_wise();
        for(k=0; k<65000; k++); // Delay to show clock Rotation
    }
}

void clock_wise(void)
{
    var1 = 0x00000800; // for step speed variation
    for(i=0; i<=3; i++) // for ABCD Stepping
    {
        var1 = var1 << 1;
        var2 = ~var1;
        var2 = var2 & 0x0000F000; // For Clockwise
        IO0PIN = ~var2;
        for(k=0; k<3000; k++);
    }
}

void anti_clock_wise(void)
{
    var1 = 0x00010000; // for step speed variation
    for(i=0; i<=3; i++) // for ABCD Stepping
    {
        var1 = var1 >> 1;
        var2 = ~var1;
        var2 = var2 & 0x0000F000; // For Anticlockwise
        IO0PIN = ~var2;
        for(k=0; k<3000; k++);
    }
}`
    },
    {
        title: "9. 4x4 Keyboard & LCD Interface",
        code: `// Program 9: Interface a 4x4 keyboard and display the key code on an LCD
#include <lpc21xx.h>
#include <stdio.h>

void lcd_init(void);
void clr_disp(void);
void lcd_com(void);
void lcd_data(void);
void wr_cn(void);
void wr_dn(void);
void scan(void);
void get_key(void);
void display(void);
void delay(unsigned int);
void init_port(void);

unsigned long int scan_code[16]= {0x00EE0000,0x00ED0000,0x00EB0000,0x00E70000,
                                  0x00DE0000,0x00DD0000,0x00DB0000,0x00D70000,
                                  0x00BE0000,0x00BD0000,0x00BB0000,0x00B70000,
                                  0x007E0000,0x007D0000,0x007B0000,0x00770000};
unsigned char ASCII_CODE[16] = {'0','1','2','3',
                                '4','5','6','7',
                                '8','9','A','B',
                                'C','D','E','F'};
unsigned char row, col;
unsigned char temp, flag, i, result, temp1;
unsigned int r, r1;
unsigned long int var, var1, var2, res1, temp2, temp3, temp4;
unsigned char *ptr, disp[] = "4X4 KEYPAD";
unsigned char disp0[] = "KEYPAD TESTING";
unsigned char disp1[] = "KEY = ";

int main()
{
    init_port(); // port intialisation
    delay(3200); // delay
    lcd_init();  // lcd intialisation
    delay(3200);
    clr_disp();  // clear display
    delay(500);

    // LCD DISPLAY TEST
    ptr = disp;
    temp1 = 0x81; // Display starting address
    lcd_com();
    delay(800);
    
    while(*ptr != '\\0')
    {
        temp1 = *ptr;
        lcd_data();
        ptr++;
    }
    
    // KEYPAD Working
    while(1)
    {
        get_key();
        display();
    }
}

void get_key(void)
{
    unsigned int i;
    flag = 0x00;
    IO1PIN |= 0x000F0000;
    
    while(1)
    {
        for(row=0x00; row<0x04; row++)
        {
            if(row == 0x00) temp3 = 0x00700000;
            else if(row == 0x01) temp3 = 0x00B00000;
            else if(row == 0x02) temp3 = 0x00D00000;
            else if(row == 0x03) temp3 = 0x00E00000;

            var1 = temp3;
            IO1PIN = var1; // each time var1 value is put to port1
            IO1CLR = ~var1; // Conforming
            scan();
            delay(100);
            if(flag == 0xff) break;
        }
        if(flag == 0xff) break;
    }
    
    for(i=0; i<16; i++)
    {
        if(scan_code[i] == res1) // equate the scan_code with res1
        {
            result = ASCII_CODE[i];
            break;
        }
    }
}

void scan(void)
{
    temp2 = IO1PIN; // status of port 1
    temp2 = temp2 & 0x000F0000; // Verifying column key
    if(temp2 != 0x000F0000) // Check for Key Press
    {
        delay(1000); // debounce delay
        temp2 = IO1PIN;
        temp2 = temp2 & 0x000F0000;
        if(temp2 != 0x000F0000)
        {
            flag = 0xff;
            res1 = temp2;
            unsigned long int t = (temp3 & 0x00F00000);
            res1 = res1 | t; // final scan value
        }
    }
    else
    {
        flag = 0x00;
    }
}

void display(void)
{
    ptr = disp0;
    temp1 = 0x80; // Display starting address of first line
    lcd_com();
    while(*ptr != '\\0')
    {
        temp1 = *ptr;
        lcd_data();
        ptr++;
    }
    
    ptr = disp1;
    temp1 = 0xC0; // display address for second line
    lcd_com();
    while(*ptr != '\\0')
    {
        temp1 = *ptr;
        lcd_data();
        ptr++;
    }
    
    temp1 = 0xC6; // position for result
    lcd_com();
    temp1 = result;
    lcd_data();
}

void lcd_init(void)
{
    temp = 0x30; wr_cn(); delay(3200);
    temp = 0x30; wr_cn(); delay(3200);
    temp = 0x30; wr_cn(); delay(3200);
    temp = 0x20; wr_cn(); delay(3200);
    temp = 0x28; lcd_com(); delay(3200); // 4 bit mode, 2 line, 5x7
    temp1 = 0x0C; lcd_com(); delay(800); // display on, cursor off
    temp1 = 0x06; lcd_com(); delay(800); // auto increment
    temp1 = 0x80; lcd_com(); delay(800);
}

void lcd_data(void)
{
    temp = temp1 & 0xf0;
    wr_dn();
    temp = temp1 & 0x0f;
    temp = temp << 4;
    wr_dn();
    delay(100);
}

void wr_dn(void)
{
    IO0CLR = 0x000000FC; // clear the port lines
    IO0SET = temp;       // Assign the value
    IO0SET = 0x00000004; // set bit RS = 1
    IO0SET = 0x00000008; // E = 1
    delay(10);
    IO0CLR = 0x00000008; // E = 0
}

void lcd_com(void)
{
    temp = temp1 & 0xf0;
    wr_cn();
    temp = temp1 & 0x0f;
    temp = temp << 4;
    wr_cn();
    delay(500);
}

void wr_cn(void)
{
    IO0CLR = 0x000000FC;
    IO0SET = temp;
    IO0CLR = 0x00000004; // RS = 0
    IO0SET = 0x00000008; // E = 1
    delay(10);
    IO0CLR = 0x00000008; // E = 0
}

void clr_disp(void)
{
    temp1 = 0x01; // clear display
    lcd_com();
    delay(500);
}

void delay(unsigned int r1)
{
    for(r=0; r<r1; r++);
}

void init_port()
{
    IO0DIR = 0x000000FC; // configure o/p lines for lcd
    IO1DIR = 0xFFF0FFFF;
}`
    },
    {
        title: "10. 7-Segment LED (0 to F)",
        code: `// Program 10: Display the Hex digits 0 to F on a 7-segment LED interface
#include <LPC21XX.h>

unsigned int delay;
unsigned int Switchcount = 0;
unsigned int Disp[16] = {0x003F0000, 0x00060000, 0x005B0000, 0x004F0000,
                         0x00660000, 0x006D0000, 0x007D0000, 0x00070000, 
                         0x007F0000, 0x006F0000, 0x00770000, 0x007C0000,
                         0x00390000, 0x005E0000, 0x00790000, 0x00710000};

#define SELDISP1 0x10000000
#define SELDISP2 0x20000000
#define SELDISP3 0x40000000
#define SELDISP4 0x80000000
#define ALLDISP  0xF0000000 // Select all displays
#define DATAPORT 0x00FF0000 // P0.16 to P0.23 Data lines

int main(void)
{
    PINSEL0 = 0x00000000;
    PINSEL1 = 0x00000000;
    IO0DIR  = 0xF0FF0000;
    IO1DIR  = 0x00000000;
    
    while(1)
    {
        IO0SET = ALLDISP; // select all digits
        IO0CLR = 0x00FF0000; // clear the data lines
        IO0SET = Disp[Switchcount]; // get the value from the array
        
        if(!(IO1PIN & 0x00800000)) // if the key is pressed
        {
            for(delay=0; delay<100000; delay++); // delay
            if((IO1PIN & 0x00800000)) // check if key released
            {
                Switchcount++;
                if(Switchcount == 0x10) // 0 to F displayed? go back to 0
                {
                    Switchcount = 0;
                    IO0CLR = 0xF0FF0000;
                }
            }
        }
    }
}`
    }
];