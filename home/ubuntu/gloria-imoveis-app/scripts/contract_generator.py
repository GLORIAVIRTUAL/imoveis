#!/usr/bin/env python3
# contract_generator.py

import sys
import json
from weasyprint import HTML, CSS
from jinja2 import Environment, FileSystemLoader
import os

def generate_pdf(template_name, data, output_path):
    """Generates a PDF from an HTML template and data using WeasyPrint and Jinja2."""
    try:
        # Setup Jinja2 environment
        template_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'templates', 'contracts')
        env = Environment(loader=FileSystemLoader(template_dir))
        template = env.get_template(template_name)

        # Render HTML with data
        html_content = template.render(data)

        # Base URL for resolving relative paths (like CSS if needed)
        base_url = os.path.dirname(os.path.abspath(__file__))

        # Generate PDF
        # Note: CSS is embedded in the HTML template in this case
        HTML(string=html_content, base_url=base_url).write_pdf(output_path)
        # print(f"PDF generated successfully: {output_path}", file=sys.stderr)
        return True
    except Exception as e:
        print(f"Error generating PDF: {e}", file=sys.stderr)
        return False

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python contract_generator.py <template_name.html> <json_data_string> <output_pdf_path>", file=sys.stderr)
        sys.exit(1)

    template_file = sys.argv[1]
    json_data_str = sys.argv[2]
    output_file = sys.argv[3]

    try:
        contract_data = json.loads(json_data_str)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON data: {e}", file=sys.stderr)
        sys.exit(1)

    if generate_pdf(template_file, contract_data, output_file):
        # print(f"PDF saved to {output_file}") # Output the path for the API
        sys.exit(0)
    else:
        sys.exit(1)

