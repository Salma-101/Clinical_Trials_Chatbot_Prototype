from trial_data import trials

def find_trials(condition):

    results = []

    for t in trials:
        if condition.lower() in t["condition"]:
            results.append(t)

    return results