module PugitaEngineHelper
  def pugita_header(&block)
    additional_header = block_given? ? capture(&block) : ''
    render :partial => 'pugita/header', :locals => {
      :additional_header => additional_header
    }
  end
  
  def pugita_footer(&block)
    additional_footer = block_given? ? capture(&block) : ''
    render :partial => 'pugita/footer', :locals => {
      :additional_footer => additional_footer
    }
  end
end