import csv
import os

txtfile="./data/ASX.txt"
outputFile="ASX.csv"


def convert_text_to_csv(file_input):

    with open(file_input) as textfile:
        reader = csv.reader(textfile, delimiter="\t")
        with open(file_input.replace(".txt", ".csv"), 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            for line in reader:
                writer.writerow(line)



for file in os.listdir("./data"):
    if file.endswith(".txt"):
        convert_text_to_csv(os.path.join("./data", file))