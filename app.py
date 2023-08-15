from flask import Flask, render_template, request, redirect, url_for,jsonify
import os
from trainer import traineee
from chatbot import chatbot


app = Flask(__name__,static_folder='static')

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    uploaded_pdfs = os.listdir(app.config['UPLOAD_FOLDER'])
    return render_template('index.html', uploaded_pdfs=uploaded_pdfs)


@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    if 'pdf_file' not in request.files:
        return redirect(request.url)
    
    pdf_file = request.files['pdf_file']

    if pdf_file.filename == '':
        return redirect(request.url)
    
    if pdf_file and pdf_file.filename.endswith('.pdf'):
        filename = pdf_file.filename
        pdf_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return redirect(url_for('index'))

    return 'Invalid file format.'


@app.route('/delete_pdf/<filename>')
def delete_pdf(filename):
    pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(pdf_path):
        os.remove(pdf_path)
        return redirect(url_for('index'))
    return 'File not found.'


@app.route('/generateModel')
def generatemodel():
    available_pdfs = os.listdir(app.config['UPLOAD_FOLDER'])
    pdf_paths = [os.path.join(app.config['UPLOAD_FOLDER'], filename) for filename in available_pdfs]
    print(pdf_paths)
    if traineee(pdf_paths):
        data = {
            "message": "Generated Successfully"
        }
    else:

        data = {
            "message": "UnSuccessfully"
        }
    return jsonify(data)


@app.route('/messaging',methods=['POST','GET'])
def message():
    data="Hi there welcome let the testing begin"
    if request.method == 'POST':
        message = request.json["message"]
        data = {
            "message": str(chatbot(message))
        }
        return jsonify(data)
    





if __name__ == '__main__':
    app.run(debug=True)
