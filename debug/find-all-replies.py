import sys
import json

f = open('myDatabase.json', 'rt')
data = json.loads(f.read())
f.close()
tweet = data["__collections__"]["posts"]["amstelvar"]["__collections__"]["tweets"]["1303053417460445184"]

# Usage example
#
# Find second 4th level reply
# `python3 find-all-replies.py 0 0 0 1`
def f(args):
    r = tweet
    amount = len(r["replies"])
    for num in args:
        r = r["replies"][int(num)]
        amount = len(r["replies"])
    return r["text"], amount

if __name__ == "__main__":
    args = sys.argv[1:]
    print(f(args))