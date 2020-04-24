require 'open-uri'

class CandidatesController < ApplicationController
  def create
    # For testing
    # resume_link = 'https://www.soundczech.cz/temp/lorem-ipsum.pdf'
    file = open(create_params[:resume_url])

    resume_content = parse_resume_content(file)
    @grade = rate_candidate(resume_content)
  end

  private

  def parse_resume_content(file)
    pdf = PDF::Reader.new(file)
    pdf_page_contents = pdf.pages.map { |page| page.text }
    pdf_page_contents.join("\n")
  end

  def rate_candidate(resume_content)
    `python3 python/rate_candidate.py \"#{resume_content}\"`
  end

  def create_params
    params.require(:candidate).permit(:resume_url)
  end
end
