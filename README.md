# MY SOLUTION

Approach:

    - Implement tests to capture existing functionality and mitigate against regression.

    - Refactor code away from using nested if blocks. Main priority was to reduce duplication of business logic (e.g. checking if quality < 50), and encapsualte logic into named functions to make it more readable and extendable.

    - Used a functional approach by running items through their respective updaters and then return new items with modifed properties. Every item gets assigned 'generic' updater for each property, then specific items get updaters overriden if they require it.

    - Create new quality updater function of Conjured items

How to improve:

    - Pass in the items array to the update_quality function and scope it so its not global. (wasnt sure if i was allowed to change the html files...)

    - Split up into multiple relevant files.

    - Make the updater functions more generic. e.g. instead of the backstagePassItemQualityUpdater you would have a more generic updater where you pass it thresholds for the quality increment gradients so that it could be used for other similar items.

    - Add more tests!!! to capture the more granular updater function logic.
