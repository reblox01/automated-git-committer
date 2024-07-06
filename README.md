# Automated Git Committer

This repository contains a Node.js script that automates the process of making random commits to a specified file in a Git repository. The script uses `simple-git` for Git operations and `moment` for date manipulation.

## Features

- Randomly generates commit dates within the past year.
- Writes the generated date to a specified file.
- Commits the changes with the generated date.
- Repeats the process for a specified number of commits.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/reblox01/automated-git-committer.git
   cd automated-git-committer
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. If not already initialized, initialize a local Git repository and link it to your remote repository:
   ```sh
   # Delete old .git if already exist and create another one
   git init

   # Link your repository with your local prj
   git remote add origin https://github.com/your-username/automated-git-committer.git
   ```

## Usage

1. Open the `index.js` file and adjust the `FILE_PATH` constant if necessary.

2. Run the script with Node.js:

    ```sh
    node index.js
    ```
    Or
    
    ```sh
    npm start
    ```

## Configuration

* The number of commits to make can be adjusted by changing the argument passed to the `makeCommit` function at the bottom of the `index.js` file. For example, `makeCommit(10)` will make 10 commits.

## Dependencies

* [simple-git](https://www.npmjs.com/package/simple-git) - A simple interface for running Git commands in any Node.js application.
* [moment](https://www.npmjs.com/package/moment) - A library for parsing, validating, manipulating, and formatting dates.
* `fs` - File system module for reading and writing files.

## Support

If you find this project helpful and would like to support its development, you can buy me a coffee:

<a href="https://www.buymeacoffee.com/arosck1"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=arosck1&button_colour=BD5FFF&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" /></a>

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any inquiries or support, please contact [sohailkoutari@gmail.com](mailto:sohailkoutari@gmail.com).

## Acknowledgements

Thank you to everyone who has supported and contributed to this project. Your feedback and assistance are invaluable.
