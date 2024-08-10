import csv
import os

destination_folder="./tmp"

def convert_text_to_csv(file_input):

    with open(file_input) as textfile:
        reader = csv.reader(textfile, delimiter="\t")
        with open(file_input.replace(".txt", ".csv"), 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            for line in reader:
                writer.writerow(line)

if not os.path.exists(destination_folder):
    os.makedirs(destination_folder)

for file in os.listdir(destination_folder):
    if file.endswith(".txt"):
        convert_text_to_csv(os.path.join(destination_folder, file))
    os.remove(os.path.join(destination_folder, file))